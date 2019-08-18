interface SchemaNode {
    tag: string;
    children?: Array<SchemaNode> | string | number;
    [propName: string]: any;
}

interface Config {
    raw?: boolean; // 显示转义字符
    wrap?: boolean; // 是否换行显示
    indent?: number; // 缩进，最大支持到8
    htmlOnly?: boolean; // 是否只允许html标签
}

const defaultConfig: Config = {
    raw: false,
    wrap: true,
    indent: 4,
    htmlOnly: true
};

const allowedTags: Array<string> = [

];

/**
 * object --> value="value" name="name"
 * @param {e} schema
 */
function resolveAttrs(attrsObject: any) {

    if (typeof attrsObject === 'object' && JSON.stringify(attrsObject) === '{}') {
        return '';
    }

    return ' ' + Object.keys(attrsObject).map(key => `${key}="${attrsObject[key]}"`).join(' ');
}

function jsonToHtml(schema: SchemaNode | Array<SchemaNode>, config?: Config, depth: number = 0): string {

    const {
        raw,
        wrap,
        indent,
        htmlOnly
    } = Object.assign(defaultConfig, config);

    if (Array.isArray(schema)) {
        return schema.map(child => jsonToHtml(child, config, depth)).join('');
    }

    // const indentText = ' '.repeat(depth * (indent as number));
    const indentText = '\t';

    let {tag, children, ...rest} = schema;
    let attrs = resolveAttrs(rest);

    // if (htmlOnly && !~allowedTags.indexOf(tag)) {
    //     console.error('当前标签不符合标准html');
    //     return '';
    // }

    let left = `<${tag}${attrs}>`;
    let right = `</${tag}>`;

    let content: any = '';
    if (typeof children === 'string' || typeof children === 'number') {
        content = children;
    } else if (typeof children === 'object') {
        content = jsonToHtml(children, config, depth + 1);
    } else if (Array.isArray(children)) {
        content = children.map((child: SchemaNode) => jsonToHtml(child, config, depth + 1)).join('');
    }

    // if (/<[a-z0-9]+>.+<\/[a-z0-9]+>/.test(content)) {
    //     left = left + '\n';
    //     content = `${indentText}${indentText}${content}`;
    //     right = indentText + right;
    // }



    // if (wrap) {
    //     content = `${content}\n`;
    // }

    let result = left + content + right;

    if (raw) {
        result = result.replace(/</gm, '&lt;').replace(/>/gm, '&gt;');
    }

    return result;
}

export default jsonToHtml;