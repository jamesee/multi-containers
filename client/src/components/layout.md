```jsx
import { Route, Switch, BrowserRouter } from "react-router-dom";
// import { CollectionsPage } from '../../pages/my-collections';
// import { Gallery } from "../../pages/gallery";

const Demo = () => {
  return (
    <div className="text-base justify-between">
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact></Route>
          <Route path="/collections"></Route>
        </Switch>
      </Layout>
    </BrowserRouter>
    </div>
  );
};

<Demo />;
```
