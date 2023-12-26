#!/bin/bash

# Prompt the user to enter the path of the source folder
source_folder="/Users/aqeelahmad/Desktop/PSReactNativeBoilerPlate/MyApp/Containers/SampleScreen"

# Check if the source folder exists
if [ -d "$source_folder" ]; then
    # Prompt the user to enter the name of the new folder
    read -p "Enter the name of the new folder: " folder_name

    # Copy the folder and its contents to the new location
    cp -R "$source_folder" "/Users/aqeelahmad/Desktop/PSReactNativeBoilerPlate/MyApp/Containers/$folder_name"
    echo "Folder copied successfully!"

    # Path to the copied index.js file
    index_file="/Users/aqeelahmad/Desktop/PSReactNativeBoilerPlate/MyApp/Containers/$folder_name/index.js"

    # Prompt the user to enter the screen name
    read -p "Enter the screen name: " screen_name

    # Prompt the user to enter the saga name
    read -p "Enter the saga name: " saga_name

    # Prompt the user to enter the injector key name
    read -p "Enter the injector key name: " injector_key

    # Prompt the user to enter the reducer name
    read -p "Enter the reducer name: " reducer_name

    # Prompt the user to enter the slice name
    read -p "Enter the slice component name: " slice_name

    # Prompt the user to enter the slice name
    # read -p "Enter the slice name: " slice_names

    # Prompt the user to enter the new selector name
    read -p "Enter the selector name: " new_selector_name

    # Update the screen name
    sed -i '' "s/SampleScreen/$screen_name/g" "$index_file"

    # Update the injector key
    sed -i '' "s/'sample'/'$injector_key'/g" "$index_file"

    # Update the saga name
    sed -i '' "s/SampleSaga/$saga_name/g" "$index_file"

    # Update the reducer name
    sed -i '' "s/SampleReducer/$reducer_name/g" "$index_file"

    # Update the selector import and usage in index.js
    sed -i '' "s/SampleSelector/$new_selector_name/g" "$index_file"

     # Path to the copied saga.js file
    saga_file="/Users/aqeelahmad/Desktop/PSReactNativeBoilerPlate/MyApp/Containers/$folder_name/saga.js"

    # Update the saga name in saga.js
    sed -i '' "s/SampleSaga/$saga_name/g" "$saga_file"

    # Path to the copied slice.js file
    slice_file="/Users/aqeelahmad/Desktop/PSReactNativeBoilerPlate/MyApp/Containers/$folder_name/slice.js"

    # Update the slice name in slice.js
    sed -i '' "s/SampleSlice/$slice_name/g" "$slice_file"

    # Update the "name" keyword in slice.js
    # sed -i '' "s/name: 'sample'/name: '$slice_name'/g" "$slice_file"

    # Update the "name" keyword in slice.js
    sed -i '' "s/'sample'/'$injector_key'/g" "$slice_file"

    # Path to the copied selector.js file
    selector_file="/Users/aqeelahmad/Desktop/PSReactNativeBoilerPlate/MyApp/Containers/$folder_name/selector.js"

    # Update the "name" keyword in selector.js
    sed -i '' "s/name: 'sample'/name: '$slice_name'/g" "$selector_file"

    # Update the slice name in selector.js after the "state" keyword
    sed -i '' "s/state.sample/state.$injector_key/g" "$selector_file"

    # Update the selector name in selector.js
    sed -i '' "s/SampleSelector/$new_selector_name/g" "$selector_file"

    echo "Index.js, saga.js, slice.js, and selector.js files updated successfully!"
else
    echo "Source folder does not exist."
fi



# execution command for script
# in container folder chmod +x ScreenGenerator.sh then ./ScreenGenerator.sh