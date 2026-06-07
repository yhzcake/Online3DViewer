import { AddDiv, CreateDomElement } from '../engine/viewer/domutils.js';
import { ButtonDialog } from './dialog.js';
import { Loc } from '../engine/core/localization.js';
import { InputFilesFromTextList } from '../engine/import/importerfiles.js';

export function ShowImportTextDialog (onOk)
{
    let dialog = new ButtonDialog ();
    
    let modelTextArea = CreateDomElement ('textarea', 'ov_dialog_textarea');
    let svgTextArea = CreateDomElement ('textarea', 'ov_dialog_textarea');
    let modelTypeSelect = CreateDomElement ('select', 'ov_dialog_select');

    let modelTypes = [
        { label: 'OBJ', value: 'obj' },
        { label: 'JSON', value: 'json' },
        { label: 'BBModel', value: 'bbmodel' }
    ];

    for (let type of modelTypes) {
        let option = CreateDomElement ('option');
        option.textContent = type.label;
        option.value = type.value;
        modelTypeSelect.appendChild (option);
    }

    let contentDiv = dialog.Init (Loc ('Open from text'), [
        {
            name : Loc ('Cancel'),
            subClass : 'outline',
            onClick () {
                dialog.Close ();
            }
        },
        {
            name : Loc ('OK'),
            onClick () {
                if (modelTextArea.value.trim().length > 0) {
                    let modelText = modelTextArea.value;
                    let svgText = svgTextArea.value;
                    let modelType = modelTypeSelect.value;
                    dialog.Close ();
                    onOk (modelText, svgText, modelType);
                } else {
                    dialog.Close ();
                }
            }
        }
    ]);

    modelTextArea.placeholder = Loc ('Enter model text...');
    svgTextArea.placeholder = Loc ('Enter SVG texture text (optional)...');

    AddDiv (contentDiv, 'ov_dialog_section', Loc ('Here you can load model text and optionally SVG texture.'));
    
    let typeRow = AddDiv (contentDiv, 'ov_dialog_section');
    AddDiv (typeRow, null, Loc ('Model format:'));
    typeRow.appendChild (modelTypeSelect);

    AddDiv (contentDiv, 'ov_dialog_section', Loc ('Model:'));
    contentDiv.appendChild (modelTextArea);
    AddDiv (contentDiv, 'ov_dialog_section', Loc ('SVG Texture (optional):'));
    contentDiv.appendChild (svgTextArea);
    dialog.Open ();
    modelTextArea.focus ();
    return dialog;
}
