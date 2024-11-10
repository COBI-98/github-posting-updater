import { UpdateReadme } from './apis/updateReadme';
import 'web-streams-polyfill/es6';

async function main() {
  try {
    await UpdateReadme.updateReadme();
    console.log("README 업데이트 작업이 완료되었습니다.");
  } catch (error) {
    console.error("README 업데이트 작업 중 오류가 발생했습니다:", error);
  }
}

main();