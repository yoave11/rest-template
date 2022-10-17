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
    return Promise.resolve(this.map.get(id) || null);
  }

  @Put('eligibility/experts/ids')
  public async setExpertEligibilityByIds(
    @Body() body: Template,
  ): Promise<void> {
      this.map.set(body.id, body);
  }
}
