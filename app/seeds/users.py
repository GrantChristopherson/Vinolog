from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@demo.io', password='password', bio="I'm here to expand my wine knowledge.")
    oliver = User(
        username='Oliver', email='oliver@gmail.com', password='password', bio="I'm the sweetest pupil EVER!!")
    grace = User(
        username='Grace', email='gracie@gmail.com', password='password')

    db.session.add(demo)
    db.session.add(oliver)
    db.session.add(grace)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
