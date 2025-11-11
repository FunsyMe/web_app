from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command
from aiogram.types.web_app_info import WebAppInfo

bot = Bot(token='7980576756:AAEYa7PmxOJhJwLNDLiOX58yNSweh70C80U')
dp = Dispatcher()

@dp.message(Command('start'))
async def start(message: types.Message):
    keyboard = types.InlineKeyboardMarkup(inline_keyboard=[
        [types.InlineKeyboardButton(
            text='Открыть приложение', 
            web_app=WebAppInfo(url='https://funsyme.github.io/web_app/')
        )]
    ])
    await message.answer('Just test web_app', reply_markup=keyboard)

async def main():
    await dp.start_polling(bot)

if __name__ == '__main__':
    import asyncio

    asyncio.run(main())