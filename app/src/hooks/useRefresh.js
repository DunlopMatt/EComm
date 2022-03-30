
import React from 'react';


export const  useRefresh = () => {
const [state, updateState] = React.useState();
const forceUpdate = React.useCallback(() => updateState({}), []);

return [forceUpdate, state]
}