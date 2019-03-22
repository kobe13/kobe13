Basic example:

```jsx
<Button title="Click me" onClick={() => alert('Hello from the Button component!')}>
  Click me
</Button>
```

Disable example:

```jsx
<Button title="Click me" disabled={true} onClick={() => alert('Hello from the Button component!')}>
  Click me
</Button>
```

Example with a children:

```jsx
import HelloWorld from '../HelloWorld/HelloWorld';

<Button
  onClick={() => alert('Hello from the Button component!')}
  title="Hello World"
  children={<HelloWorld message="from the HelloWorld component" />}
/>;
```
