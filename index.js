  });
}

app.get('/test', (req,res) => {
app.get('/api/test', (req,res) => {
  mongoose.connect(process.env.MONGO_URL);
  res.json('test ok');
});

app.post('/register', async (req,res) => {
app.post('/api/register', async (req,res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {name,email,password} = req.body;

@@ -80,7 +80,7 @@ app.post('/register', async (req,res) => {

});

app.post('/login', async (req,res) => {
app.post('/api/login', async (req,res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {email,password} = req.body;
  const userDoc = await User.findOne({email});
@@ -102,7 +102,7 @@ app.post('/login', async (req,res) => {
  }
});

app.get('/profile', (req,res) => {
app.get('/api/profile', (req,res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {token} = req.cookies;
  if (token) {
@@ -116,12 +116,12 @@ app.get('/profile', (req,res) => {
  }
});

app.post('/logout', (req,res) => {
app.post('/api/logout', (req,res) => {
  res.cookie('token', '').json(true);
});


app.post('/upload-by-link', async (req,res) => {
app.post('/api/upload-by-link', async (req,res) => {
  const {link} = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  await imageDownloader.image({
@@ -133,7 +133,7 @@ app.post('/upload-by-link', async (req,res) => {
});

const photosMiddleware = multer({dest:'/tmp'});
app.post('/upload', photosMiddleware.array('photos', 100), async (req,res) => {
app.post('/api/upload', photosMiddleware.array('photos', 100), async (req,res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const {path,originalname,mimetype} = req.files[i];
@@ -143,7 +143,7 @@ app.post('/upload', photosMiddleware.array('photos', 100), async (req,res) => {
  res.json(uploadedFiles);
});

app.post('/places', (req,res) => {
app.post('/api/places', (req,res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {token} = req.cookies;
  const {
@@ -161,7 +161,7 @@ app.post('/places', (req,res) => {
  });
});

app.get('/user-places', (req,res) => {
app.get('/api/user-places', (req,res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {token} = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
@@ -170,13 +170,13 @@ app.get('/user-places', (req,res) => {
  });
});

app.get('/places/:id', async (req,res) => {
app.get('/api/places/:id', async (req,res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {id} = req.params;
  res.json(await Place.findById(id));
});

app.put('/places', async (req,res) => {
app.put('/api/places', async (req,res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {token} = req.cookies;
  const {
@@ -197,12 +197,12 @@ app.put('/places', async (req,res) => {
  });
});

app.get('/places', async (req,res) => {
app.get('/api/places', async (req,res) => {
  mongoose.connect(process.env.MONGO_URL);
  res.json( await Place.find() );
});

app.post('/bookings', async (req, res) => {
app.post('/api/bookings', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);
  const {
@@ -220,7 +220,7 @@ app.post('/bookings', async (req, res) => {



app.get('/bookings', async (req,res) => {
app.get('/api/bookings', async (req,res) => {
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);
  res.json( await Booking.find({user:userData.id}).populate('place') );
