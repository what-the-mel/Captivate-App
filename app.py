import discord
from discord import app_commands
from secret import TOKEN, GUILD_ID
from functions import message_functions


# --------------  IMPORTANT VARIABLES -------------- 
intents = discord.Intents.default()
client = discord.Client(intents=intents)
tree = app_commands.CommandTree(client)


# -------------- COMMAND BUILDERS --------------




# -------------- ON READY -------------- 
@client.event
async def on_ready():
    await tree.sync(guild=discord.Object(id=GUILD_ID))
    print("Ready!")

# -------------- RUN APP -------------- 
client.run(TOKEN)