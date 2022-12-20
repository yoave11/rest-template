// @ts-ignore
import { baseUrl } from "../config";
import fetch from 'node-fetch';

describe("Basic tests", () => {


  test("is alive", async () => {
    const response = await fetch(`${baseUrl}/isAlive`);
    expect(response.ok).toBeTruthy();
    expect(response.json()).resolves.toBeTruthy();
  });

  // test("add element and get element", async () => {
  //   const id = "test1";
  //   const templateObject = { id, number: 2 };
  //   await agent
  //     .put("/api/v1/template-route")
  //     .send(templateObject)
  //     .expect(204);
  //   await agent
  //     .get(`/api/v1/template-route/${id}`)
  //     .expect(res =>
  //       console.log(res))
  //     .send({ id: "test1", number: 2 })
  //     .expect(200);
  // });
});
