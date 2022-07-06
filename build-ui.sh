echo "Building Angular application..."
cd ./src/ui/transaction-generator 
npm run build
cd ../../../
copyfiles -u 4 -f ./src/ui/transaction-generator/dist/transaction-generator/* ./dist/public 
echo "Copied built angular application to dist/public/ directory..."