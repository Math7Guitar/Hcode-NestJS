import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Migrate1717688154595 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'usrs',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            unsigned: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '63',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '127',
            isUnique: true,
          },
          {
            name: 'username',
            type: 'varchar',
            length: '127',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '127',
            isUnique: true,
          },
          {
            name: 'birthAt',
            type: 'date',
            isUnique: true,
          },
          {
            name: 'role',
            type: 'int',
            default: '0',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('usrs');
  }
}
