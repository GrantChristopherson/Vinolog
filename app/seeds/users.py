from app.models import db, User


# Adds a demo user, you can add other users here if you want
# def seed_users():
    # demo = User(
    #     username='Demo', email='demo@demo.io', password='password', followers=[], following=[])
    # oliver = User(
    #     username='Oliver', email='oliver@gmail.com', password='password', profile_image='https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', followers=[demo], following=[demo])
    # grace = User(
    #     username='Grace', email='gracie@gmail.com', password='password', profile_image='https://images.pexels.com/photos/1486213/pexels-photo-1486213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', followers=[demo, oliver], following=[oliver])

    # db.session.add(demo)
    # db.session.add(oliver)
    # db.session.add(grace)

    # db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
# def undo_users():
#     db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
#     db.session.commit()
