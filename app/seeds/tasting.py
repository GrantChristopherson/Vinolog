from app.models import db, User, Tasting, Discussion



def seed_tasting():

  user1 = User(username='Markie', email='mark@gmail.com', password='password', bio='I love all wine', followers=[], following=[])
  user2 = User(username='Gary', email='gary@gmail.com', password='password', bio='I like some wine', followers=[], following=[user1])
  user3 = User(username='Ronnie', email='ron@gmail.com', password='password', bio='Sommelier in training', followers=[user1, user2], following=[user1])


  db.session.add(user1)
  db.session.add(user2)
  db.session.add(user3)


  tasting1 = Tasting(
    producer='Arnot Roberts',
    region='Northern coast of California',
    vineyard='N/A',
    varietal='Trousseau Noir',
    vintage=2018,
    other_info='Small production, 26 barrels',
    sight='Ruby, legs move quickly... low alcohol, no evidence of sediment',
    nose='Fresh Raspberries, currants, granite',
    palate='Red berries, bright acid, very fine tannin',
    thoughts='Easy drink, sunny day "Park" wine',
    love=True,
    user=user1,
    tasting_cheers=[user2, user3]
  )

  tasting2 = Tasting(
    producer='Knoll',
    region='Wachau, Austria',
    vineyard='Ried Kreutles',
    varietal='Gruner Veltliner',
    vintage=2016,
    other_info='Federspiel',
    sight='Star Bright, straw, maybe amber',
    nose='Stone Fruit, white Flowers, Almond',
    palate='Vegetal and a bit floral...  Screaming acid',
    thoughts='I wanna eat some Cacio Pepe with this',
    love=True,
    user=user1,
    tasting_cheers=[user2]
  )

  tasting3 = Tasting(
    producer='Fratelli Alessandria',
    region='Verduno, Italy',
    vineyard='N/A',
    varietal='Pelaverga Piccolo',
    vintage=2019,
    other_info='DOC, indigenous to the region',
    sight='Garnet, very light bodied, some fine bubbles present',
    nose='under ripe strawberry, potting soil',
    palate='High acid, suprisingly firm tannin, fruit consisten with nose',
    thoughts='Would be great with pizza',
    love=False,
    user=user2,
    tasting_cheers=[user1]
  )


  db.session.add(tasting1)
  db.session.add(tasting2)
  db.session.add(tasting3)


  comment1 = Discussion(
    comment = "You make me want to try this!",
    user = user3,
    tastings = tasting1
  )

  comment2 = Discussion(
    comment = "I described it alright?",
    user = user1,
    tastings = tasting1
  )

  comment3 = Discussion(
    comment = "Where can I find this?",
    user = user2,
    tastings = tasting2
  )


  db.session.add(comment1)
  db.session.add(comment2)
  db.session.add(comment3)

  db.session.commit()


def undo_tasting():
  db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
  db.session.commit()