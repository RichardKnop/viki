viki
====

Clone the repository:

```
$ git clone https://github.com/RichardKnop/viki.git
```

Create a virtual environment and install requirements:

```
$ virtualenv venv
$ source venv/bin/activate
$ pip install -r requirements.txt
```

Sync the database:

```
$ python manage.py syncdb
```

Run the development server:

```
$ python manage.py runserver
```

You can now test the API:

```
localhost:8000/api/v1/players.json
```

And the views:

```
localhost:8000/pages/players
localhost:8000/pages/playersjs
```
