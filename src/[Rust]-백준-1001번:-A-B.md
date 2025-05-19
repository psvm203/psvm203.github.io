# [Rust] 백준 1001번: A-B

[https://www.acmicpc.net/problem/1001](https://www.acmicpc.net/problem/1001)

### 문제

두 정수 A와 B를 입력받은 다음, A-B를 출력하는 프로그램을 작성하시오.

### 입력

첫째 줄에 A와 B가 주어진다. (0 < A, B < 10)

### 출력

첫째 줄에 A-B를 출력한다.

### 예제 입력

> 3 2

### 예제 출력

> 1

### 해설

```rust
use std::io::*;

fn main() {
    let stdin = read_to_string(stdin()).unwrap();
    # let stdin = "3 2\n";

    let nums: Vec<usize> = stdin
        .split_ascii_whitespace()
        .map(|x| x.parse().unwrap())
        .collect();

    let output = nums[0] as i32 - nums[1] as i32;

    print!("{output}");
}
```

`A`와 `B`의 값은 자연수지만, `A - B`는 음수가 될 수 있으므로 i32 타입으로 캐스팅한다.
