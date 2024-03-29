import { oneOf, text } from './parserGenerator';
import { failure, success } from './helpers';

export const integer = (input) => {
  const match = /^\d+/.exec(input);

  if (match == null) {
    return failure('a integer', input);
  }

  const matchedText = match[0];

  const result = +matchedText;
  const rest = input.slice(matchedText.length);

  return success(result, rest);
};

export const eof = (input) => {
  if (input.length !== 0) {
    return failure('end of input', input);
  }

  return success(null, input);
};

// export const spaces = regex(/\s*/);

export const operator = (input) => {
  const parsers = ['+', '-', '*', '/'].map((op) => text(op));

  const result = oneOf(parsers)(input);

  if (result.isFailure) {
    return failure('a operator', input);
  }

  const { data, rest } = result;

  return success(data, rest);
};

export default {};
