import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // TODO(T2.1 – issue #14): tạo danh mục, sản phẩm, size, topping, user demo, mã WELCOME10.
  console.log('Seed: chưa có dữ liệu (xem issue #14)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
