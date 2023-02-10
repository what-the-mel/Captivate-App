def get_message_date(message):
    """Returns the channel date from a message"""
    return message.created_at.date()

def get_most_recent(channel):
    """Returns the most recent message in a channel"""