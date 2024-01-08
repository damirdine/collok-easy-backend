import { auth } from "../../controllers/authController";

const models = {
  user: {
    findOne: async (...params) => {
      return {
        email: "",
        password:
          "$argon2id$v=19$m=65536,t=3,p=4$ih7eguF5Fg+UqX/gdN1uOQ$tRwox7ZyAE5xwd2lB8RaZ9Wi0HwH6cC83VvZgyGiebM",
        toJSON: () => {
          return {
            email: "email@ecample",
            password:
              "$argon2id$v=19$m=65536,t=3,p=4$ih7eguF5Fg+UqX/gdN1uOQ$tRwox7ZyAE5xwd2lB8RaZ9Wi0HwH6cC83VvZgyGiebM",
          };
        },
      };
    },
    findAll: async () => {
      return [{ email: "hello" }];
    },
  },
};

describe("Name of the group", () => {
  test("should ", async () => {
    const { login } = auth(models);
    const req = {
      body: {
        email: "email@ecample",
        password: "your_password",
      },
    };
    const res = {
      status: function (status) {
        this.status = status;
        return this;
      },
      json: function (data) {
        this.json = data;
        return this;
      },
    };

    const response = await login(req, res);
    expect(response.token !== "").toBe(true);
  });
});
