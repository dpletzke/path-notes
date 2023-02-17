const mocker = require("mocker-data-generator").default;
import { ObjectId } from "mongodb";
const fs = require("fs").promises;
import {
  make20AlphaNumericId,
  makeTenNumericId,
} from "../helpers/seed-helpers";
require("util");

const account = {
  accountId: {
    function: function () {
      return make20AlphaNumericId();
    },
  },
};

const device = {
  deviceId: {
    function: function () {
      return `DLV${makeTenNumericId()}`;
    },
  },
};

const zone = {
  _id: {
    function: function () {
      return { $oid: ObjectId() };
    },
  },
  accountId: {
    hasOne: "account",
    get: "accountId",
  },
  zoneCount: {
    faker: "random.arrayElement(123)",
  },
  siteCount: {
    faker: "random.arrayElement(123)",
  },
  locationCount: {
    faker: "random.arrayElement(123)",
  },
};

const user = {
  _id: {
    function: function () {
      return { $oid: ObjectId() };
    },
  },
  name: {
    function: function () {
      return `${this.faker.name.firstName()}`;
    },
  },
  email: {
    faker: "internet.email",
  },
  password: {
    static: "$2a$08$4eRGUQIS/HHgL.t/Xg3Ys.5gyXD81U/9PffXM/MBUa.9/Eqs7JNFm",
  },
  accountId: {
    hasOne: "account",
    get: "accountId",
  },
  role: {
    function: function () {
      return this.db.user.filter((u) => u.role === "admin").length < 2
        ? "admin"
        : "user";
    },
  },
  isEmailVerified: {
    static: false,
  },
};

const zoneDeviceAssignment = {
  _id: {
    function: function () {
      return { $oid: ObjectId() };
    },
  },
  deviceId: {
    hasOne: "device",
    get: "deviceId",
  },
  zoneId: {
    hasOne: "zone",
    get: "_id",
  },
  dateSetUp: {
    function: function () {
      const { faker } = this;
      return {
        $date: faker.random.arrayElement([
          faker.date.recent(5),
          faker.date.recent(20),
          faker.date.recent(120),
        ]),
      };
    },
  },
  createdBy: {
    hasOne: "user",
    get: "_id",
  },
};

const sample = {
  sampleId: {
    function: function () {
      return makeTenNumericId();
    },
  },
  zoneDeviceAssignmentId: { hasOne: "zoneDeviceAssignment", get: "_id" },
  sampleType: {
    function: function () {
      return this.faker.random.arrayElement(["General", "Specific"]);
    },
  },
  result: {
    static: "Pending",
  },
  notes: {
    function: function () {
      return Math.random() > 0.5
        ? ""
        : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m";
    },
  },
  dateSampled: {
    function: function () {
      const thisZda = this.db.zoneDeviceAssignment.find(
        (zda) => zda._id.$oid === this.object.zoneDeviceAssignmentId.$oid
      );
      return {
        $date: new Date(
          new Date(thisZda.dateSetUp.$date).getTime() + 24 * 60 * 60 * 1000
        ),
      };
    },
  },
  createdBy: {
    function: function () {
      return this.faker.random.arrayElement(
        this.db.user.filter((u) => u.role === "user").map((u) => u._id)
      );
    },
  },
  // TODO make some days have shipmentIds and make all sample collected on that day to have the same id
  // this can be done by hashing the date string on days divisble by 3
  // shipmentId: {
  //   function: function () {
  //     return Math.random() > 0.5 ? '' : this.faker.random.alphaNumeric(10);
  //   },
  // },
  isConfirmed: {
    function: function () {
      return Math.random() > 0.7;
    },
  },
  isPublished: {
    function: function () {
      return this.object.isConfirmed && Math.random() > 0.5;
    },
  },
  isArchived: {
    function: function () {
      return Math.random() > 0.1;
    },
  },
};

mocker()
  .schema("account", account, 5)
  .schema("device", device, 10)
  .schema("zone", zone, 10)
  .schema("user", user, 5)
  .schema("zoneDeviceAssignment", zoneDeviceAssignment, 30)
  .schema("sample", sample, 10000)
  .build()
  .then((data) => {
    // console.log(util.inspect(data, { depth: 10 }));
    // console.log(data);
    // write JSON string to a file

    const loadAccounts = fs.writeFile(
      "seeds/1-accounts/accounts.json",
      JSON.stringify(data.account)
    );
    const loadDevices = fs.writeFile(
      "seeds/2-devices/devices.json",
      JSON.stringify(data.device)
    );
    const loadZones = fs.writeFile(
      "seeds/3-zones/zones.json",
      JSON.stringify(data.zone)
    );
    const loadUsers = fs.writeFile(
      "seeds/4-users/users.json",
      JSON.stringify(data.user)
    );
    const loadZoneDeviceAssignments = fs.writeFile(
      "seeds/5-zone_device_assignments/zoneDeviceAssignments.json",
      JSON.stringify(data.zoneDeviceAssignment)
    );
    const loadSamples = fs.writeFile(
      "seeds/6-samples/samples.json",
      JSON.stringify(data.sample)
    );

    return Promise.all([
      loadAccounts,
      loadUsers,
      loadDevices,
      loadZones,
      loadZoneDeviceAssignments,
      loadSamples,
    ]);
  })
  .catch((err) => {
    console.error(err);
  });
