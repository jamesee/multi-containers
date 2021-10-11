
```jsx
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Layout } from "./layout";

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