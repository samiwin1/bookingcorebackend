pipeline {
    agent any
    tools {
        maven 'Maven'  // Ensure Maven is installed and configured in Jenkins
    }
    stages {
        stage('Build Maven') {
            steps {
         checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/samiwin1/bookingcorebackend.git']])
        
                sh "mvn -Dmaven.test.failure.ignore=true clean package"
            }
        }
           stage('Build Docker Image') {
            steps {
                script {
                  sh 'docker build -t bookingcoreback-nodeprod:latest .'
                }
            }
        }
        
 
       
    }
}

