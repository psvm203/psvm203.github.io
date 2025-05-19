# [Rust] 백준 1000번: A+B

[https://www.acmicpc.net/problem/1000](https://www.acmicpc.net/problem/1000)

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

### 해설

```rust
use std::io::*;

fn main() {
    let stdin = read_to_string(stdin()).unwrap();
    # let stdin = "1 2\n";

    let sum: usize = stdin
        .split_ascii_whitespace()
        .map(|x| x.parse::<usize>().unwrap())
        .sum();

    println!("{sum}");
}
```

<br>

```rust
use std::io::*;
```

`std::io::read_to_string()`과 `std::io::stdin()`을 간단히 표현하기 위해 `use std::io::*`를 사용한다.

<br>

```rust
let stdin = read_to_string(stdin()).unwrap();
```

그 후, [Rust 알고리즘 입출력](Rust-알고리즘-입출력.md)에서 설명했듯 `read_to_string()` 으로 표준 입력 전체를 읽어 `stdin` 변수에 저장한다.

<br>

```rust
stdin
.split_ascii_whitespace()
```

`split_ascii_whitespace()`는 문자열을 공백과 줄바꿈 기준으로 나누는 반복자를 만든다.  
예제에서는 "1 2\n" 문자열을 ["1", "2"] 형태의 반복자로 만든다.

<br>

```rust
.map(|x| x.parse::<usize>().unwrap())
```

`map()`은 반복자의 각 요소에 클로저를 적용하여 새로운 반복자를 만든다.  
즉, "1"을 파싱하고, "2"를 파싱하여 [1, 2] 형태의 반복자를 만든다.

<br>

```rust
.sum();
```

마지막으로 `sum()`을 호출하여 반복자에 들어있는 모든 숫자의 합을 더하여 출력한다.  
`sum()`은 타입 명시가 필요하므로 `sum::<usize>()`를 사용하거나 저장되는 변수의 타입을 usize로 명시하여 사용하여야 한다.
