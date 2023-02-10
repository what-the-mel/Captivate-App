import discord
from discord import app_commands
from dotenv import load_dotenv
import os
import commands

load_dotenv()

# --------------  IMPORTANT VARIABLES -------------- 
token = os.getenv('TOKEN')
guild_id = os.getenv('GUILD_ID')


intents = discord.Intents.default()
client = discord.Client(intents=intents)
tree = app_commands.CommandTree(client)


# -------------- COMMAND BUILDERS --------------




# -------------- ON READY -------------- 
@client.event
async def on_ready():
    await tree.sync(guild=discord.Object(id=guild_id))
    print("Ready!")


# -------------- RUN APP -------------- 
client.run(token)