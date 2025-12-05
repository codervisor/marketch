/**
 * Test file for the Marketch parser
 */
import { parseMarketch } from './parser';

const testInput = `# Page Title
> Card (padding: large)
  > Row (justify: between)
    * [Text] "Dashboard" (size: lg)
    * [Button] "Logout"
  * [Input] "Search..."`;

console.log('Testing Marketch Parser\n');
console.log('Input:');
console.log(testInput);
console.log('\n' + '='.repeat(60) + '\n');

const ast = parseMarketch(testInput);

console.log('Output AST:');
console.log(JSON.stringify(ast, null, 2));
