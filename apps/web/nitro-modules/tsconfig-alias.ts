import { defineNitroModule } from 'nitropack/kit';

import { aliasForNitro } from '../scripts/alias-map';

export default defineNitroModule({
  setup(nitro) {
    nitro.options.alias = {
      ...(nitro.options.alias ?? {}),
      ...aliasForNitro(),
    };
  },
});
