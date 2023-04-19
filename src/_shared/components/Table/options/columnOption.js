export const columnOption = ({ placeholder = 'Type Something' }) => {
    return {
        placeholder, // custom the input placeholder
        delay: 2000, // how long will trigger filtering after user typing, default is 500 ms
        getFilter: f => {
            console.log('filter: ', f);
        },
    };
};
