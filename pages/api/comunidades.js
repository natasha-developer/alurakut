import { SiteClient } from "datocms-client";

export default async function receiveRequest(request, response) {
  if (request.method === "POST") {
    const token = process.env.TOKEN;
    const client = new SiteClient(token);

    const record = await client.items.create({
      itemType: "967261",
      ...request.body,
    });

    response.json({
      record: record,
    });
    return;
  }

  response.status(404).json({
    message: "Method not allowed",
  });
}
