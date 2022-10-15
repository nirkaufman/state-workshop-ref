# NGRX Store Demo

- install: `npm install @ngrx/store --save`
- standalone usage:

```typescript
bootstrapApplication(AppComponent, {
  providers: [
      importProvidersFrom(StoreModule.forRoot({}))
  ]
})
```

# Step 1: Define model

- talk about the most core component: model.
- should we use an interface or a class?
- should be plain ts!

# Step 2: Define state (on reducer file )
- `posts.reducer.ts`
- should be kept on a different file for scale

# Step 3: Define all application events (actions)
- `posts.actions.ts`
- discuss metadata
- discuss action types. do we need it?

# Step 4: Define reducer
- `posts.reducer.ts`
- reducer care only about document actions

# Step 5: Define selectors
- explain memoize

```javascript
function memoize(fn) {
  const cache = new Map();

  return (...args) => {
    const key = JSON.stringify(args);

    if(!cache.has(key)) {
      cache.set(key, fn(...args));
    }

    return cache.get(key);
  }
}

function sum(a, b) {
  console.log('sum execute');
  return a + b;
}

const memoSum = memoize(sum);

memoSum(1,1);
memoSum(1,1);
memoSum(1,1);
memoSum(1,1);

```
- reset memoize selector with `selector.release()`

# add effects

- install `npm i @ngrx/effects`
- go over: `posts.effects`
- should we extract the Post API to a service? yes. for cleaner, readable code.
- NGRX Sits on top of BL! Effect should execute plain logic
- Effect shouldn't know about HttpClient

# Discuss Project structure
- Clear separation between UI, NGRX, and Services
  - UI : Presentation layer
  - BL : Plain services
  - Store : Event System

# Extend thanks to events
- Let's react to `post updated` event and log with enrich data
- when using tap - disable dispatch
```typescript
    eventsLogger$ = createEffect(() => (
        this.actions$.pipe(
          ofType(PostActionTypes.PostsUpdated),
          tap( (action) => console.log('action logged:', action))
        )
    ), {dispatch: false})
```
