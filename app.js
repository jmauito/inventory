const express =  require('express');

const app = express();
const port = 4000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Library API",
      version: "1.0.0"
    }
  },
  apis: ['app.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

const products = [
  {id:1, name:'Product1', stock:100},
  {id:2, name:'Product2', stock:200},
  {id:3, name:'Product3', stock:300}
];

app.get('/', (req, res) => {
  res.send('Hello World!!');
});

/**
 * @swagger
 * /products:
 *   get:
 *     description: List all products
 *     responses:
 *       200:
 *         description: Success
 */
app.get('/products', (req, res) => {
  res.send(products);
});

/**
 * @swagger
 * /products:
 *   post:
 *     description: Add a new product
 *     parameters:
 *     - name: product
 *       description: product object (JSON) with properites name and stock
 *       in: body
 *       required: true
 *       type: string
 *     responses:
 *       200:
 *         description: Success
 */

app.post('/products', (req, res) => {
  console.log(req.body);
  const {name, stock} = req.body;
  const id = products.length + 1;
  const newProduct = {id, name, stock};
  products.push(newProduct);
  res.send([newProduct, products]);
});

app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});