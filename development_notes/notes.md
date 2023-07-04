# Midi notes

```Javascript
 track.addNote({
     midi : 60,
     time : 0,
     duration: 0.2
 })
 .addNote({
     name : 'C5',
     time : 0.3,
     duration: 0.1
 })
 .addCC({
     number : 64,
     value : 127,
     time : 0.2
 })
```
