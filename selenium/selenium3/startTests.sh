# https://www.seleniumhq.org/selenium-ide/docs/en/introduction/command-line-runner/

# --base-url https://localhost

# local
#selenium-side-runner -c "browserName=chrome" ./test.side
#selenium-side-runner -c "browserName=firefox" ./test.side
# selenium-side-runner -c "browserName='internet explorer'"
# selenium-side-runner -c "browserName=edge"
# selenium-side-runner -c "browserName=safari" 

#Selenium hub

cd ~/git/sgvizler2
selenium-side-runner  --server http://localhost:4444/wd/hub -c 'browserName=chrome' ./selenium/tests.side
selenium-side-runner  --server http://localhost:4444/wd/hub -c 'browserName=firefox' ./selenium/tests.side
selenium-side-runner  --server http://localhost:4444/wd/hub -c "browserName=operablink" ./selenium/tests.side
