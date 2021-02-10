BUNDLE = '/usr/local/bin/bundle'
JEKYLL = '/usr/local/bin/jekyll'
DEPLOY = '/var/www/website'
RSYNC = '/usr/local/bin/rsync'
SRC = 'https://git.liambeckman.com/liam'
USER = 'lbeckman314'
REPO = 'website'

node {
    stage('Update') {
        sh "echo git push git@github.com:$USER/$REPO.git"
        sh "git push git@github.com:$USER/$REPO.git"
    }
    stage('Build') {
        sh "$BUNDLE install"
        sh "$BUNDLE exec $JEKYLL build"
    }
    stage('Deploy') {
        sh "rsync -crvz --delete _site/* $DEPLOY"
    }
}

