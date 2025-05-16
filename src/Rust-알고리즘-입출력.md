# Rust 알고리즘 입출력

## 입력

### 전체 입력

```rust,ignore
fn main() {
    let input = std::io::read_to_string(std::io::stdin()).unwrap();
}
```

표준 입력 전체를 읽어 하나의 String에 저장한다.

<br>

```rust,ignore
use std::io::*;

fn main() {
    let input = read_to_string(stdin()).unwrap();
}
```

`use std::io::*;`를 사용하면 코드가 조금 더 간결해진다.

### 정수 하나만 입력되는 경우

[백준 2438번: 별 찍기 - 1](https://www.acmicpc.net/problem/2438)

> 5

```rust
use std::io::*;

fn main() {
    let input = read_to_string(stdin()).unwrap();
    # let input = "5\n";

    let n: usize = input.trim().parse().unwrap();

    print!("{n}");
}
```

백준에서는 입력 끝에 줄바꿈 문자가 포함되는 경우가 많다.

이때 "5\n"와 같은 문자열을 바로 `parse()`하면 에러가 발생한다.

따라서 `trim()`으로 줄바꿈 문자를 제거한 후 파싱해야한다.

대부분의 문제에서 정수 입력은 자연수로 주어지므로 usize 타입을 사용했다.

usize는 인덱스 접근 시에도 편리하다.

만약 음수를 포함한 정수를 파싱한다면 `n`의 타입으로 i32 또는 i128을, 실수를 파싱한다면 f64 타입을 사용한다.

### 여러 개의 정수가 입력되는 경우

[백준 2475번: 검증수](https://www.acmicpc.net/problem/2475)

> 0 4 2 5 6

```rust
use std::io::*;

fn main() {
    let input = read_to_string(stdin()).unwrap();
    # let input = "0 4 2 5 6\n";

    let nums: Vec<usize> = input
        .split_ascii_whitespace()
        .flat_map(|x| x.parse())
        .collect();

    print!("{:?}", nums);
}
```

`split_ascii_whitespace()`는 공백과 줄바꿈 문자를 기준으로 문자열을 나누어준다.

따라서 띄어쓰기로 구분된 정수뿐만 아니라 줄바꿈 문자로 구분된 정수도 처리할 수 있다.

반면, `split(' ')`은 ["0", "4", "2", "5", "6\n"]으로 나누어져서 파싱에 실패하므로 불가능하다.

### 각 줄에 여러 개의 정수가 입력되는 경우

[백준 10871번: X보다 작은 수](https://www.acmicpc.net/problem/10871)

> 10 5<br>1 10 4 9 2 3 8 5 7 6

```rust
use std::convert::*;
use std::io::*;

fn main() {
    let input = read_to_string(stdin()).unwrap();
    # let input = "10 5\n1 10 4 9 2 3 8 5 7 6";
    let mut lines = input.lines();

    let mut read_ints = || -> Vec<usize> {
        lines
            .next()
            .unwrap()
            .split(' ')
            .flat_map(|x| x.parse())
            .collect()
    };

    let [n, k] = read_ints().try_into().unwrap();
    let nums = read_ints();

    println!("{n}");
    println!("{k}");
    print!("{:?}", nums);
}
```

`collect()`는 반환값이므로 뒤에 세미콜론이 없음에 주의해야 한다.

`std::convert::TryInto` 트레잇에 구현된 `try_into()` 메소드는 `Vec`를 `array`로 변환해준다.

### 메모리가 부족한 경우

[백준 10989번: 수 정렬하기 3](https://www.acmicpc.net/problem/10989)

메모리 제한이 8MB에 불과하기 때문에 `read_to_string()`을 사용하면 메모리 초과가 뜬다.

> 10<br>5<br>2<br>3<br>1<br>4<br>2<br>3<br>5<br>1<br>7

```rust,ignore
use std::io::*;

fn main() {
    let n: usize = {
        let mut buffer = String::new();
        stdin().read_line(&mut buffer).unwrap();

        input.trim().parse().unwrap()
    };

    for _ in 0..n {
        let mut buffer = String::new();
        stdin().read_line(&mut buffer).unwrap();

        let num: usize = input.trim().parse().unwrap();
    }
}
```
