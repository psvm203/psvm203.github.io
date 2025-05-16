# [Rust] 백준 1000번: A+B

### 문제
두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.

### 입력
첫째 줄에 A와 B가 주어진다. (0 < A, B < 10)

### 출력
첫째 줄에 A+B를 출력한다.

### 예제 입력
> 1 2

### 예제 출력
> 3

### 코드

```rust
use std::io::*;

fn main() {
    let input = read_to_string(stdin()).unwrap();
    # let input = "1 2\n";
    let nums = input.split_ascii_whitespace().map(|x| x.parse::<usize>().unwrap());

    let sum = nums.sum();

    print!("{sum}");
}
```

[Rust 알고리즘 입출력](Rust-알고리즘-입출력.md)에서 설명했듯 `read_to_string` 함수로 표준 입력 전체를 `input` String에 저장한다.
