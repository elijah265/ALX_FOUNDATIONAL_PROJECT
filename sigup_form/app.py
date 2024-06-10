from flask import Flask, render_template, request, redirect, url_for, flash, session
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'supersecretkey'  # Necessary for session management

# In-memory database to store users
users = {}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/signup', methods=['POST'])
def signup():
    username = request.form['username']
    email = request.form['email']
    password = request.form['password']

    if username in users:
        flash('Username already exists. Please choose another one.', 'danger')
        return redirect(url_for('index'))
    else:
        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
        users[username] = {'email': email, 'password': hashed_password}
        flash('Signup successful!', 'success')
        session['username'] = username
        return redirect(url_for('welcome'))
    
@app.route('/welcome')
def welcome():
    if 'username' in session:
        username = session['username']
        return render_template('welcome.html', username=username)
    else:
        return redirect(url_for('index'))
    
@app.route('/users')
def users_list():
    return render_template('users.html', users=users)

if __name__ == '__main__':
    app.run(debug=True)
