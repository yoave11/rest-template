import * as request from "supertest";
import expressServer from "../../../src/server";

describe("Basic tests", () => {

  const agent = request.agent(expressServer);

  test("is alive", async () => {
    await agent
      .get("/isAlive")
      .expect((res) => expect(res.text).toEqual("true"))
      .expect(200);
  });

  test("add element and get element", async () => {
    const id = "test1";
    const templateObject = { id, number: 2 };
    await agent
      .put("/api/v1/template-route")
      .send(templateObject)
      .expect(204);
    await agent
      .get(`/api/v1/template-route/${id}`)
      .expect(res =>
        console.log(res))
      .send({ id: "test1", number: 2 })
      .expect(200);
  });
});
