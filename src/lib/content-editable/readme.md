### Content Editable Plugin for website editing

#### Making already written template content editable

The Content Editable plugin works based on html custom attributes.

Attributes starting with data-x-... are used by the plugin.

##### data-x:
The path to read and write the data to the app's context.

It will also make the element editable and adds an edit button on the element.

Example:
```jsx
<div data-x="hero.title">{appContext.hero.title}</div>
```


#### data-x-group
Is similar to the data-x (is used instead of data-x) attribute but for lists and array data structure.

It will consider all direct child elements as array item.
The array items (i.e direct child elements) will have a remove button that removes the element from the list.

##### data-x-key-in-group
Indicates the relative path of the element from the list item.
(This is used internally for cloning a list item when adding a new item to the list via the add button)

Example:
```jsx
<div data-x-group="team.members">
    {
        appContext.team.members.map(member => (
            <div>
                <h3 data-x-key-in-group="name">{member.name}</h3>
                <p> data-x-key-in-group="description"{member.description}</p>
            </div>
        ))
    }
</div>
```


#### data-x-icon

Is used to render icons dynamically reading the icon name from the app context. The react-lucide is used as the icon package. https://lucide.dev/icons/.

! Use the ```Icon``` component exported from the ```content-editable``` package in order to parse the icons dynamically.

! Ensure that the value of the icon is a valid icon name. You can use ```isIconNameValid``` method exported from the ```content-editable``` package.
! Ensure setting the ```data-x / data-key-in-group``` for the element 
Example:
```jsx

<div data-x="title.icon" data-x-icon={appContext.title.icon}>
    <Icon name={appContext.title.icon}/>
</div>


```

#### data-x-section
In order to make edit buttons visible only when hovered on their section, this attribute should be added to their container section. The value of this attribute does not matter yet.