# Frontend Coding Convention

## 1. 핵심 제어문 규칙 (Strict Control Flow Rules)

### 1.1. 이중 중첩 루프(Double-nested Loops) 금지
코드의 인지적 복잡도(Cognitive Complexity)를 낮추고 성능을 확보하기 위해 이중 중첩 루프 사용을 엄격히 금지합니다.
* **해결책**: 데이터 구조를 사전에 평탄화(Flatten)하거나, 내부 루프 로직을 독립적인 순수 함수로 추출하여 사용합니다.
* 배열 메서드(`flatMap`, `map`, `reduce` 등)를 적극적으로 활용하여 선언적으로 데이터를 처리합니다.

### 1.2. if-else 블록 및 삼항 연산자(Ternary Operators) 지양
복잡한 조건 분기는 가독성을 저해하므로 사용을 최소화합니다.
* **해결책 1 (Guard Clauses)**: 함수 시작 부분에서 예외 조건을 먼저 처리하고 조기 종료(Early Return)하여 `else` 블록을 제거합니다.
* **해결책 2 (Object Mapping)**: 상태나 조건에 따른 값 반환이 필요할 때는 조건문 대신 객체 맵(Object Map)이나 룩업 테이블(Lookup Table)을 활용하여 조건식을 매핑 처리합니다.

---

## 2. JavaScript / ES6+ 규칙

### 2.1. 변수 선언
* 불변성을 지키기 위해 기본적으로 `const`만 사용합니다.
* 재할당이 불가피하게 필요한 경우에만 예외적으로 `let`을 사용하며, `var`는 절대 사용하지 않습니다.

### 2.2. 함수 (Functions)
* 호이스팅으로 인한 혼란을 방지하기 위해 화살표 함수(Arrow Function) 표현식을 권장합니다.
* 함수의 매개변수(Parameters)가 3개를 초과할 경우, 객체 구조 분해 할당(Object Destructuring)을 통해 인자를 전달받습니다.

---

## 3. React 컴포넌트 규칙

### 3.1. 컴포넌트 선언 및 구조
* 모든 컴포넌트는 함수형(Functional)으로 작성하며, React Hooks를 활용합니다.
* 컴포넌트 내부의 렌더링 로직은 최소화하고, 비즈니스 로직은 커스텀 훅(Custom Hook)이나 유틸리티 함수로 분리합니다.

### 3.2. Props 처리
* Props는 항상 구조 분해 할당(Destructuring)을 사용하여 명시적으로 가져옵니다.
* 컴포넌트의 재사용성을 높이기 위해 Props의 기본값(Default Parameter)을 적극적으로 활용합니다.

---

## 4. jQuery 및 DOM 제어 규칙

### 4.1. DOM 탐색 및 캐싱
* DOM 탐색(Traversal) 비용을 최소화하기 위해 한 번 찾은 jQuery 객체는 반드시 변수에 캐싱하여 재사용합니다.
* jQuery 변수명은 DOM 요소임을 명확히 알 수 있도록 `$` 접두사를 사용합니다. (예: `const $submitButton = $('#btn-submit');`)

### 4.2. 이벤트 바인딩
* 동적으로 생성되는 요소의 이벤트를 처리할 때는 이벤트 위임(Event Delegation)을 사용하여 메모리 누수를 방지합니다.