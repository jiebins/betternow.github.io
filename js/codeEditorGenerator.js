function exec (editorId) {
  let text = codeEditors[editorId].getValue();
  let ifr = document.createElement("iframe");
  let resultWrapper = document.getElementsByClassName('result-wrapper');
  ifr.setAttribute("id", "result");
  ifr.setAttribute("frameborder", "0");
  resultWrapper[editorId].innerHTML = "";
  resultWrapper[editorId].appendChild(ifr);

  let ifrw = (ifr.contentWindow) ? ifr.contentWindow : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr.contentDocument;
  ifrw.document.open();
  ifrw.document.write(text);
  ifrw.document.close();
}

// 获取容器
let editorFields = document.getElementsByClassName('editor-field');
let codeEditors = []

for (let i = 0; i < editorFields.length; i++) {
  // 新建代码编辑器相关元素
  let contentField = document.createElement('div');
  let contentTitle = document.createElement('div');
  let titleText = document.createElement('span');
  let execBtn = document.createElement('button');
  let editor = document.createElement('textarea');

  // 新建运行结果相关元素
  let resultField = document.createElement('div');
  let resultTitle = document.createElement('div');
  let resultTitleText = document.createElement('span');
  let resultWrapper = document.createElement('div');

  // 组装代码编辑器
  contentField.className = 'field';
  contentTitle.className = 'content-title';
  titleText.innerHTML = '源代码';
  execBtn.className = 'bttn-stretch bttn-sm bttn-primary'
  execBtn.onclick = function () {
    exec(i);
  }
  execBtn.innerHTML = '运行';
  editor.className = 'editor';
  editor.style = 'resize: none;';
  contentTitle.appendChild(titleText);
  contentTitle.appendChild(execBtn);
  contentField.appendChild(contentTitle);
  contentField.appendChild(editor);


  // 组装运行结果显示器
  resultField.className = 'field';
  resultField.className = 'result-field';
  resultTitle.className = 'result-title';
  resultTitleText.innerHTML = '运行结果';
  resultWrapper.className = 'result-wrapper';
  resultTitle.appendChild(resultTitleText);
  resultField.appendChild(resultTitle);
  resultField.appendChild(resultWrapper);

  // 整合两个部分
  editorFields[i].appendChild(contentField);
  editorFields[i].appendChild(resultField);

  let codeEditor = CodeMirror.fromTextArea(editor, {
    mode: 'htmlmixed',
    theme: 'idea',
    indentUnit: 2,
    lineWrapping: true
  })
  codeEditors.push(codeEditor);
  let initCode = '<!DOCTYPE html>\r\n<html>\r\n<head>\r\n<meta charset=\"utf-8\">\r\n<title>海里睡人<\/title>\r\n<\/head>\r\n<body>\r\n6666\r\n<\/body>\r\n<\/html>\r\n';
  codeEditor.getDoc().setValue(initCode);
  exec(i);
}