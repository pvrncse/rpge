import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    bio: 'I am Alice. this is about me.',
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    bio: 'I am Nilu. this is about me.',
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    bio: 'I am Mahmoud. this is about me.',
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
