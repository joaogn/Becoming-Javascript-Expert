# run on root

#find . -name *.test.js
#find . -name *.test.js -not -path '*node_modules**'
#find . -name *.js -not -path '*node_modules**'

#npm i -g ipt
#find . -name *.js -not -path '*node_modules**' | ipt

# Add the 'use strict' on project from module01

cp -r ../../Module01/tdd-bdd-project .

CONTENT="'use stric';"


# 1s - first line
# ^ - first collum
# change by CONTENT
# broken the line to add the implict \n 

# change selected files
#find . -name *.js -not -path '*node_modules**' \
#| ipt -o \
#| xargs -I '{file}' sed -i "" -e '1s/^/\'"'use stric';"'\
#/g' {file}

# change all
find . -name *.js -not -path '*node_modules**' \
| xargs -I '{file}' sed -i "" -e '1s/^/\'"'use stric';"'\
/g' {file}
