import { ResponseBody, QuestionDetails, ResponseResult } from '/@/lib/apis'

export const DEFAULT_COLUMNS_NUM = 2;
export const defaultColumns = [
  { name: 'traqID', label: 'traQID' },
  { name: 'submitted_at', label: '回答日時' }
]
export const tableFormTabs = ['view', 'markdown', 'csv']
export const detailTabs = ['statistics', 'spreadsheet', 'individual']
export const tableForm = 'view'
export const isTextTable = ['markdown', 'csv'].includes(tableForm)
export const isSelectType = (type: string): boolean =>
  ['MultipleChoice', 'Checkbox', 'Dropdown'].includes(type)
export const isNumberType = (type: string): boolean =>
  ['LinearScale', 'Number'].includes(type)
export const textTables = {
  markdown: '',
  csv: ''
}
export const getTableRow = (results: ResponseResult[], index: number): string[] => {
  // typecheck対策
  // const ret = defaultColumns
  //   .map(column => results[index][column.name])
  const ret = [results[index].traqID, results[index].submitted_at].concat(
    (() => {
      const mapper: string[] = []
      results[index].body.forEach((response: ResponseBody) =>
        mapper.push(responseToString(response))
      )
      return mapper
    })()
  )
  return ret
}
const responseToString = (body: ResponseBody): string => {
  let ret = ''
  switch (body.question_type) {
    case 'MultipleChoice':
    case 'Checkbox':
    case 'Dropdown':
      body.option_response.forEach((response: string) => {
        if (ret !== '') {
          ret += ', '
        }
        ret += response
      })
      return ret
    case 'TextArea':
      // type check対策
      // return tableForm === 'markdown'
      //   ? body.response.replace(/\n/g, '<br>')
      //   : body.response
      return body.response
    default:
      return body.response
  }
}

// statistic系

export type CountedData = {
  title: string
  type: string
  length?: number
  total: {
    average: string
    standardDeviation: string
    median: string
    mode: string
  } | null
  data?: [choice: string | number, ids: string[]][]
}

type AnswerData = {
  traqId: string
  modifiedAt: string
  answer: number | string | string[]
}

const generateIdTable = (questionType: string, answers: AnswerData[]): [choice: string | number, ids: string[]][] => {
  const total = new Map();
  answers.forEach((answer: AnswerData) => {
    if (isSelectType(questionType)) {
      (<string[]>answer.answer).forEach((value) => {
        if (!total.has(value)) total.set(value, []);
        total.get(value).push(answer.traqId);
      });
    } else {
      if (!total.has(answer.answer)) total.set(answer.answer, []);
      total.get(answer.answer).push(answer.traqId);
    }
  });
  let arr = [...total];
  if (isNumberType(questionType)) arr = arr.sort((a, b) => b[0] - a[0]);
  return arr;
}

const generateStats = (questionType: string, answers: AnswerData[]): {
  average: string
  standardDeviation: string
  median: string
  mode: string
} | null => {
  if (!isNumberType(questionType)) return null;
  const average = answers.reduce((acc, answer) => acc + <number>answer.answer, 0) / answers.length;
  const variance = answers.map(answer => (<number>answer.answer - average) ** 2).reduce((acc, value) => acc + value) / answers.length;

  const center = Math.floor(answers.length / 2);
  const sorted = answers.sort((a, b) => <number>a.answer - <number>b.answer);
  const median = answers.length % 2 == 0 ?
    (<number>sorted[center - 1].answer + <number>sorted[center].answer) * 0.5 :
    <number>sorted[center].answer;

  const table = new Map();
  answers.forEach((answer) => {
    if (!table.has(answer.answer)) table.set(answer.answer, []);
    table.get(answer.answer).push();
  });

  const arr = [...table].sort((a, b) => b[1] - a[1]);
  const mode = arr.filter(v => arr[0][1] === v[1]).map(v => v[0]).join(', ');

  return {
    average: average + '',
    standardDeviation: Math.sqrt(variance).toFixed(2),
    median: median + '',
    mode,
  };
}

export const countData = (questions: QuestionDetails[], results: ResponseResult[]): null | CountedData[] => {
  if (questions.length <= 0 || results.length <= 0) return null;
  const data: AnswerData[][] = Array.from({ length: questions.length }, () => []);

  // question毎に各結果を格納
  results.forEach((result: ResponseResult) => {
    const answers = result.body;

    answers.forEach((answer: ResponseBody, index: number) => {
      data[index].push({
        traqId: result.traqID,
        modifiedAt: result.modified_at,
        answer:
          isSelectType(answer.question_type) ? answer.option_response :
            isNumberType(answer.question_type) ? +answer.response :
              answer.response,
      });
    });
  });

  return questions.map((question: QuestionDetails, index: number): CountedData => ({
    title: question.body,
    type: question.question_type,
    data: generateIdTable(question.question_type, data[index]),
    total: generateStats(question.question_type, data[index]),
    length: data[index].length,
  }));
};
