import { writeFileSync } from 'fs';
import { join } from 'path';
import { ERDBuilder } from 'typeorm-erd';
import { AppDataSource } from '../datasource/app.datasource';

const main = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const erd = new ERDBuilder('mermaid', AppDataSource);
  await erd.initialize();
  const mermaidErd = await erd.render();

  const readmeContent = `# Lyo Server

## Database ERD

\`\`\`mermaid
${mermaidErd}
\`\`\`
`;

  writeFileSync(join(process.cwd(), 'README.md'), readmeContent);

  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
