from app.models import db, User, Tasting, Discussion



def seed_tasting():

  demo = User(username='Demo', email='demo@demo.io', password='password', bio='Just checking things out around here!', followers=[], following=[])
  oliver = User(username='Oliver', email='oliver@gmail.com', password='password', bio='All about them juicy reds', profile_image='https://profile-photos-vinolog.s3.us-west-1.amazonaws.com/istockphoto-1386479313-612x612.jpeg', followers=[demo], following=[demo])
  grace = User(username='Grace', email='gracie@gmail.com', password='password', bio='Working on my Somm skills', profile_image='https://profile-photos-vinolog.s3.us-west-1.amazonaws.com/istockphoto-1300972573-612x612.jpeg', followers=[demo, oliver], following=[oliver])
  user1 = User(username='Mark', email='mark@gmail.com', password='password', bio='Who am I kidding, I love all wine!', profile_image='https://profile-photos-vinolog.s3.us-west-1.amazonaws.com/istockphoto-1303539316-612x612.jpeg', followers=[], following=[])
  user2 = User(username='Gary', email='gary@gmail.com', password='password', bio='Wine brat through and through', profile_image='https://profile-photos-vinolog.s3.us-west-1.amazonaws.com/istockphoto-1309328823-612x612.jpeg', followers=[], following=[user1])
  user3 = User(username='Ron', email='ron@gmail.com', password='password', bio='My palate leans towards crisp and lean whites, but trying to expand...', profile_image='https://profile-photos-vinolog.s3.us-west-1.amazonaws.com/istockphoto-1338134319-612x612.jpeg', followers=[user1, user2], following=[user1])

  db.session.add(demo)
  db.session.add(oliver)
  db.session.add(grace)
  db.session.add(user1)
  db.session.add(user2)
  db.session.add(user3)


  tasting1 = Tasting(
    producer='Arnot Roberts',
    region='Northern coast of California',
    vineyard='N/A',
    varietal='Trousseau Noir',
    vintage='2018',
    color='Red',
    label_image='https://wine-labels-vinolog.s3.us-west-1.amazonaws.com/57i0f_WrQsawoRVVF6aI_A_pb_600x600.png',
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
    vintage='2016',
    color='White',
    label_image='https://wine-labels-vinolog.s3.us-west-1.amazonaws.com/Knoll-gruner-Ried-Kreutles-FederspieL.jpeg',
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
    vintage='2019',
    color='Red',
    label_image='https://wine-labels-vinolog.s3.us-west-1.amazonaws.com/download.jpeg',
    other_info='DOC, indigenous to the region',
    sight='Garnet, very light bodied, some fine bubbles present',
    nose='under ripe strawberry, potting soil',
    palate='High acid, suprisingly firm tannin, fruit consisten with nose',
    thoughts='Would be great with pizza',
    love=False,
    user=user2,
    tasting_cheers=[user1]
  )

  tasting4 = Tasting(
    producer='Folk Machine',
    region='Central Coast, CA',
    vineyard='',
    varietal='Pinot Noir',
    vintage='2016',
    color='Red',
    label_image='https://wine-labels-vinolog.s3.us-west-1.amazonaws.com/download+(1).jpeg',
    other_info='I think the grapes are grown near Monterey',
    sight='light plum color, no sediment',
    nose='baked cherries, hibiscus, dried roses petals',
    palate='juicy, easy drinking park wine',
    thoughts='Would be great with pizza... in the park, lookin at you Delfina!',
    love=True,
    user=grace,
    tasting_cheers=[user1, oliver, demo, user3, user2]
  )

  tasting5 = Tasting(
    producer='Villa Sparina',
    region='Piemonte, Italy',
    vineyard='',
    varietal='Cortese',
    vintage='2016',
    color='White',
    label_image='https://wine-labels-vinolog.s3.us-west-1.amazonaws.com/download+(2).jpeg',
    other_info='Gavi de Gavi, grown in clay and marl soil',
    sight='light yellow almost green hue',
    nose='under ripe pear and apple, slate, cinnamon',
    palate='more mineral driven, but the pear and apple come through',
    thoughts='Think it would be good with shellfish or paella',
    love=True,
    user=oliver,
    tasting_cheers=[demo, user3]
  )

  tasting6 = Tasting(
    producer='COS Pithos Bianco',
    region='Sicily, Italy',
    vineyard='Fontane Vineyard',
    varietal='Grecanico',
    vintage='2021',
    color='Orange',
    label_image='https://wine-labels-vinolog.s3.us-west-1.amazonaws.com/download+(3).jpeg',
    other_info='orange wine is just white wine with more skin contact! Who knew??',
    sight='amber colored, a bit of sediment',
    nose='baked apples and honeysuckle',
    palate='suprisingly tart, like biting into an unripe apricot',
    thoughts='Wanna drink this while I nosh on a massive cheese plate',
    love=True,
    user=grace,
    tasting_cheers=[demo, user1]
  )

  tasting7 = Tasting(
    producer='Kuen Hof',
    region='Alto Adige, Italy',
    vineyard='',
    varietal='Sylvaner',
    vintage='2018',
    color='White',
    label_image='https://wine-labels-vinolog.s3.us-west-1.amazonaws.com/download+(4).jpeg',
    other_info='Northern, high altitude region.  Bavarian history, hence German sounding name.',
    sight='transparent pale greenish yellow',
    nose='tropical fruit and flowers',
    palate='medium bodied, tropical fruit comes through but with nice acidity',
    thoughts='',
    love=True,
    user=user3,
    tasting_cheers=[user2]
  )

  tasting8 = Tasting(
    producer='Foradori Fontanasanta',
    region='Trentino, Italy',
    vineyard='',
    varietal='Riesling, Pinot Bianco',
    vintage='2020',
    color='White',
    label_image='https://wine-labels-vinolog.s3.us-west-1.amazonaws.com/f4dd0ee5-ae9b-4de7-92e3-a30c7ed7e43b.jpeg',
    other_info='low alcohol, 12.5%',
    sight='light straw coloration, watery at the rim',
    nose='bruised apples, wet stone, jasmine',
    palate='medium bodied, bright acidity but balanced',
    thoughts='drinkable, but not especially exciting to me...',
    love=False,
    user=demo,
    tasting_cheers=[]
  )

  tasting9 = Tasting(
    producer='Tascante, Ghiaia Nero',
    region='Mt Etna, Sicily, Italy',
    vineyard='',
    varietal='Nerello Mascalese',
    vintage='2020',
    color='Red',
    label_image='https://wine-labels-vinolog.s3.us-west-1.amazonaws.com/ScreenShot2022-12-31at1.52.37PM.jpg',
    other_info='Northern side of Mount Etna, cooler climate, neutral oak barrels',
    sight='Deep purple',
    nose='Blackberries, herbaceous and earthy',
    palate='medium plus body, firm tannin, fruit is more subdued, earthiness more dramatic',
    thoughts='lamb shank would be an ideal pairing for me!',
    love=True,
    user=demo,
    tasting_cheers=[user3, user2, grace, oliver]
  )

  tasting10 = Tasting(
    producer='Egly-Ouriet',
    region='Ambonnay, Bouzy, Champagne, France',
    vineyard='',
    varietal='Chardonnay and Pinot Noir',
    vintage='NV',
    color='Sparkling',
    label_image='https://wine-labels-vinolog.s3.us-west-1.amazonaws.com/image.jpeg',
    other_info='Grand Cru',
    sight='fine bubbles, golden color',
    nose='Yellow apples mainly but white flowers and chalk too.',
    palate='Similar to how it smells, but has a lot of weight and harmonious acidity',
    thoughts='Oysters and caviar somehow seem appropriate... If i could afford it.',
    love=True,
    user=demo,
    tasting_cheers=[grace, oliver, user1]
  )
  tasting11 = Tasting(
    producer='Onward',
    region='Suisun Valley, CA',
    vineyard='',
    varietal='Malvasia Bianca',
    vintage='2021',
    color='White',
    label_image='',
    other_info='',
    sight='dark yellow, maybe even honey colored',
    nose='Melon and quince and orange zest',
    palate='soft on the palate, light on acidity, fun, easy but dare I say basic?',
    thoughts='Feel like the balance is off, just my opinion though',
    love=False,
    user=demo,
    tasting_cheers=[]
  )

  tasting12 = Tasting(
    producer='Mathiasson',
    region='Napa Valley, CA',
    vineyard='',
    varietal='Cabernet Sauvignon',
    vintage='2019',
    color='Red',
    label_image='https://wine-labels-vinolog.s3.us-west-1.amazonaws.com/IMG_5795_768x1024.jpg',
    other_info='Robert Mathiasson has made wine for many of the best CA wine producers',
    sight='Inky purple',
    nose='Black cherries, blueberries and baking spice',
    palate='Ripe, fruit forward cali cab',
    thoughts='Crowd pleasing and well made, but not my cup of tea',
    love=False,
    user=demo,
    tasting_cheers=[]
  )

  db.session.add(tasting1)
  db.session.add(tasting2)
  db.session.add(tasting3)
  db.session.add(tasting4)
  db.session.add(tasting5)
  db.session.add(tasting6)
  db.session.add(tasting7)
  db.session.add(tasting8)
  db.session.add(tasting9)
  db.session.add(tasting10)
  db.session.add(tasting11)
  db.session.add(tasting12)


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

  comment4 = Discussion(
    comment = "Absolutely, I love light, pretty reds",
    user = user3,
    tastings = tasting1
  )

  comment5 = Discussion(
    comment = "Maybe Flatiron, downtown?  Otherwise, try online.",
    user = user1,
    tastings = tasting2
  )

  comment6 = Discussion(
    comment = "Who doesn't like easy park Pinot's!",
    user = demo,
    tastings = tasting4
  )

  comment7 = Discussion(
    comment = "Sicilian wines are delicious!",
    user = demo,
    tastings = tasting6
  )

  comment8 = Discussion(
    comment = "Agreed, but orange wines aren't for everyone, I like em weird though...",
    user = grace,
    tastings = tasting6
  )

  comment9 = Discussion(
    comment = "Would have NEVER guessed.  The name sounds soo German, makes sense obviously",
    user = user2,
    tastings = tasting7
  )

  comment10 = Discussion(
    comment = "Our scope of historical borders of nations and cultures don't tend to be great, my memory is like a goldfish.",
    user = user3,
    tastings = tasting7
  )

  comment11 = Discussion(
    comment = "ooohh, I LOVE NERELLO'S!",
    user = grace,
    tastings = tasting9
  )

  comment12 = Discussion(
    comment = "Same. Drank this while watching White Lotus",
    user = demo,
    tastings = tasting9
  )

  comment13 = Discussion(
    comment = "White Lotus?",
    user = grace,
    tastings = tasting9
  )

  comment14 = Discussion(
    comment = "Yeah! The show was set just north of Mt. Etna in Taormina, highly recommend the show AND the wine.",
    user = demo,
    tastings = tasting9
  )

  comment15 = Discussion(
    comment = "oooh, bougie Bouzy bubbles!  I think this is a bit outta my price range.",
    user = user1,
    tastings = tasting10
  )

  comment16 = Discussion(
    comment = "Same page here, but one can dream.  A friend opened this for a special occasion.  Lucky me!",
    user = demo,
    tastings = tasting10
  )


  db.session.add(comment1)
  db.session.add(comment2)
  db.session.add(comment3)
  db.session.add(comment4)
  db.session.add(comment5)
  db.session.add(comment6)
  db.session.add(comment7)
  db.session.add(comment8)
  db.session.add(comment9)
  db.session.add(comment10)
  db.session.add(comment11)
  db.session.add(comment12)
  db.session.add(comment13)
  db.session.add(comment14)
  db.session.add(comment15)
  db.session.add(comment16)

  db.session.commit()


def undo_tasting():
  db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
  db.session.commit()