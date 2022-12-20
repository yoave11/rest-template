import {Body, Controller, Get, Put, Route, Tags} from 'tsoa';
import {Template} from "../types";

@Tags('Template')
@Route('template-route')
export class TemplateController extends Controller {

  map: Map<String, Template> = new Map<String,Template>;

  @Get('{id}')
  public async getTemplate(
    id: string,
  ): Promise<Template | null> {
    console.log(`getTemplate: ${id}`);
    return this.map.get(id) || null;
  }

  @Put()
  public async setTemplate(
    @Body() body: Template,
  ): Promise<void> {

      this.map.set(body.id, body);
  }
}
