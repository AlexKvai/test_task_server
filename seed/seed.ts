// seed.ts

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
	try {
		// Проверка существующих пользователей и создание нового пользователя, если нет
		const existingUsers = await prisma.user.findMany()
		if (existingUsers.length === 0) {
			console.log('No existing user found. Creating a new user...')
			await prisma.user.create({
				data: {
					email: 'example@example.com', // Замените на реальный email
					password: 'securepassword', // Замените на реальный пароль
					avatar: 'https://example.com/avatar.jpg', // Опционально
				},
			})
			console.log('User created.')
		} else {
			console.log('User already exists.')
		}

		// Создание категорий
		await prisma.category.createMany({
			data: [
				{ name: 'Функциональность' },
				{ name: 'Баг' },
				{ name: 'UI' },
				{ name: 'Производительность' },
			],
			skipDuplicates: true,
		})

		// Создание статусов
		await prisma.status.createMany({
			data: [
				{ name: 'Идея' },
				{ name: 'Запланировано' },
				{ name: 'В работе' },
				{ name: 'Выполнено' },
			],
			skipDuplicates: true,
		})

		const existingFeedbacks = await prisma.feedback.findMany()
		if (existingFeedbacks.length === 0) {
			await prisma.feedback.createMany({
				data: [
					{
						title: 'Feedback example 1',
						description: 'Detailed feedback description 1',
						categoryId: 1,
						statusId: 1,
						createdAt: new Date(),
						authorId: 1,
					},
					{
						title: 'Feedback example 2',
						description: 'Detailed feedback description 2',
						categoryId: 2,
						statusId: 2,
						createdAt: new Date(),
						authorId: 1,
					},
					{
						title: 'Feedback example 3',
						description: 'Detailed feedback description 3',
						categoryId: 3,
						statusId: 3,
						createdAt: new Date(),
						authorId: 1,
					},
				],
				skipDuplicates: true,
			})
		}

		console.log('Seeding completed.')
	} catch (error) {
		console.error('Error during seeding:', error)
	} finally {
		await prisma.$disconnect()
	}
}

main()
