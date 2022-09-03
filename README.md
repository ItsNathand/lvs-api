# lvs_api
Non official api for the website la-vies-colaire.fr
## Make your first request
```javascript
(async () => {
try {
  let api = new lvs(creds);
  let devoirs = await api.get('devoirs');
  let result = await devoirs.export('json', {from:["10", "03", "2022"], to:["30", "03", "2022"]});
  console.log(result);
} catch (error) {
  console.log(error)
} })();
```